# frozen_string_literal: true

class ReportsJob
  include Sidekiq::Worker

  def perform(quiz_slug, report_path)
    quiz = Quiz.find_by(slug: quiz_slug)
    return unless quiz

    @attempts = Attempt.belonging_to(quiz.id)
    puts @attempts.inspect
    content = ApplicationController.render(
      assigns: {
        attempts: @attempts
      },
      template: "api/v1/public/quizzes/report/download",
      layout: "pdf"
    )
    pdf_blob = WickedPdf.new.pdf_from_string content
    File.open(report_path, "wb") do |f|
      f.write(pdf_blob)
    end
  end
end
