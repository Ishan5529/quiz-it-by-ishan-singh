published = @quiz.published_quiz&.data || {}

json.title published["title"] || @quiz.title
json.category @quiz.category&.name
json.questions (published["questions"] || []) do |q|
  json.id q["id"]
  json.title q["title"]
  json.options q["options"]
  json.correct_option encrypt_correct_option(q["correct_option"])
end
