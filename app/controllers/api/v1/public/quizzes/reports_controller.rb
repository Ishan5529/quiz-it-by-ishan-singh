class Api::V1::Public::Quizzes::ReportsController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_quiz, only: [:create, :download]

  def create
    quiz_slug = params[:quiz_slug]
    ReportsJob.perform_async(quiz_slug, report_path.to_s)
    render_json("in_progress")
  end

  def download
    unless @quiz.report.attached?
      render_error("not_found") and return
    end

    send_data @quiz.report.download, filename: pdf_file_name, content_type: "application/pdf"
  end

  private

    def set_quiz
      @quiz = Quiz.find_by(slug: params[:quiz_slug])
      render_error("not_found") unless @quiz
    end

    def report_path
      @_report_path ||= Rails.root.join("tmp/#{pdf_file_name}")
    end

    def pdf_file_name
      "submissions_report.pdf"
    end
end
