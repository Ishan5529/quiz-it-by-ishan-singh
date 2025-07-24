json.attempts @attempts do |attempt|
  json.id attempt.id
  json.user_name attempt.user_name
  json.user_email attempt.user_email
  json.submission_time attempt.submission_time
  json.correct_answers attempt.correct_answers
  json.wrong_answers attempt.wrong_answers
  json.unanswered attempt.unanswered
  json.questions attempt.questions.count
  json.status attempt.status
  json.user_id attempt.user_id
  json.quiz_id attempt.quiz_id
  json.created_at attempt.created_at
  json.updated_at attempt.updated_at
end

json.meta do
  json.current_page @attempts.current_page
  json.total_pages @attempts.total_pages
  json.total_count @attempts.total_count
  json.per_page @attempts.limit_value
end
