json.quizzes @quizzes do |quiz|
  published = quiz.published_quiz&.data || {}
  json.slug quiz.slug
  json.title published["title"] || quiz.title
  json.category quiz.category&.name
  json.total_questions (published["questions"] || []).size
end
