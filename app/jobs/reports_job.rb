# frozen_string_literal: true

class ReportsJob
  include Sidekiq::Worker

  def perform(quiz_slug, report_path)
    quiz = Quiz.find_by(slug: quiz_slug)
    return unless quiz

    @attempts = Attempt.belonging_to(quiz.id)
    html_report = ApplicationController.render(
      assigns: {
        attempts: @attempts
      },
      template: "api/v1/public/quizzes/report/download",
      layout: "pdf"
    )
    pdf_report = WickedPdf.new.pdf_from_string html_report
    if quiz.report.attached?
      quiz.report.purge_later
    end
    quiz.report.attach(
      io: StringIO.new(pdf_report), filename: "submissions_report.pdf",
      content_type: "application/pdf")
    quiz.save
  end
end
