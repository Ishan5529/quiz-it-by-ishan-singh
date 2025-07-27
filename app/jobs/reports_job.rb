# frozen_string_literal: true

class ReportsJob
  include Sidekiq::Worker

  def perform(user_id, quiz_slug, report_path)
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.render"), progress: 25 })

    quiz = Quiz.find_by(slug: quiz_slug)
    return unless quiz

    @published_quiz = PublishedQuiz.find_by(quiz_id: quiz.id)
    return unless @published_quiz

    ActionCable.server.broadcast(user_id, { message: I18n.t("report.generate"), progress: 50 })

    @attempts = Attempt.belonging_to(quiz.id).order(submission_time: :desc)
    html_report = ApplicationController.render(
      assigns: {
        attempts: @attempts,
        quiz: @published_quiz
      },
      template: "api/v1/public/quizzes/report/download",
      layout: "pdf"
    )

    ActionCable.server.broadcast(user_id, { message: I18n.t("report.upload"), progress: 75 })

    pdf_report = WickedPdf.new.pdf_from_string html_report
    if quiz.report.attached?
      quiz.report.purge_later
    end
    quiz.report.attach(
      io: StringIO.new(pdf_report), filename: "submissions_report.pdf",
      content_type: "application/pdf")
    quiz.save

    ActionCable.server.broadcast(
      user_id,
      { message: I18n.t("report.attach"), progress: 100 })
  end
end
