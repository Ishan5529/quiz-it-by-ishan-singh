class Api::V1::Public::Quizzes::ReportsController < Api::V1::BaseController
  def create
    quiz_slug = params[:quiz_slug]
    puts "This is the quiz slug #{quiz_slug}"
    Rails.logger.info "Params: #{params.inspect}"
    ReportsJob.perform_async(quiz_slug, report_path.to_s)
    render_json("in_progress")
  end

  def download
    if File.exist?(report_path)
      send_file(
        report_path,
        type: "application/pdf",
        filename: pdf_file_name,
        disposition: "attachment"
      )
    else
      render_error("not_found")
    end
  end

  private

    def report_path
      @_report_path ||= Rails.root.join("tmp/#{pdf_file_name}")
    end

    def pdf_file_name
      "submissions_report.pdf"
    end
end
