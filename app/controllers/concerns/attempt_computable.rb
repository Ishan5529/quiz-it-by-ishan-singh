# frozen_string_literal: true

module AttemptComputable
  extend ActiveSupport::Concern

  def build_attempt_questions(published_questions)
    published_questions.map do |pq|
      {
        question_id: pq["id"],
        selected_option: nil,
        options: pq["options"] || [],
        title: pq["title"],
        correct_option: pq["correct_option"].to_s
      }
    end
  end

  def compute_attempt_stats(questions, published_questions)
    correct = 0
    wrong = 0
    unanswered = 0

    questions.each do |q|
      published_question = published_questions.find { |pq| pq["id"].to_s == q["question_id"].to_s }
      options = published_question ? published_question["options"] || [] : []
      correct_option = published_question ? published_question["correct_option"].to_s : nil

      q["options"] = options
      q["title"] = published_question ? published_question["title"] : nil
      q["correct_option"] = correct_option

      selected_option_index = options.index(q["selected_option"])&.+(1)

      if q["selected_option"].blank?
        unanswered += 1
        q["selected_option"] = nil
      elsif published_question && selected_option_index.to_s == correct_option
        correct += 1
        q["selected_option"] = selected_option_index.to_s
      else
        wrong += 1
        q["selected_option"] = selected_option_index.to_s
      end
    end

    [correct, wrong, unanswered, questions]
  end

  def build_attempt_attributes(params, quiz, current_user, published_questions, update: false)
    if update
      questions = params[:questions] || []
      correct, wrong, unanswered, updated_questions = compute_attempt_stats(questions, published_questions)
      params.merge(
        quiz: quiz,
        submission_time: Time.current,
        correct_answers: correct,
        wrong_answers: wrong,
        unanswered: unanswered,
        questions: updated_questions
      )
    else
      questions = build_attempt_questions(published_questions)
      unanswered = published_questions.count
      correct = 0
      wrong = 0
      params.merge(
        user: current_user,
        user_name: current_user.name,
        user_email: current_user.email,
        quiz: quiz,
        submission_time: Time.current,
        correct_answers: correct,
        wrong_answers: wrong,
        unanswered: unanswered,
        questions: questions
      )
    end
  end
end
