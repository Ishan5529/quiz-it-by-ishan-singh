# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @category = create(:category)
    @quiz = build(:quiz, user: @user, category: @category)
  end

  # Associations
  def test_belongs_to_user
    quiz = create(:quiz, user: @user, category: @category)
    assert_equal @user, quiz.user
  end

  def test_belongs_to_category
    quiz = create(:quiz, user: @user, category: @category)
    assert_equal @category, quiz.category
  end

  def test_has_many_questions
    quiz = create(:quiz, user: @user, category: @category)
    question1 = create(:question, quiz: quiz)
    question2 = create(:question, quiz: quiz)
    assert_includes quiz.questions, question1
    assert_includes quiz.questions, question2
  end

  def test_has_many_attempts
    quiz = create(:quiz, user: @user, category: @category)
    attempt1 = create(:attempt, quiz: quiz)
    attempt2 = create(:attempt, quiz: quiz)
    assert_includes quiz.attempts, attempt1
    assert_includes quiz.attempts, attempt2
  end

  def test_has_one_published_quiz
    quiz = create(:quiz, user: @user, category: @category)
    published = create(:published_quiz, quiz: quiz)
    assert_equal published, quiz.published_quiz
  end

  # Validations
  def test_valid_with_valid_attributes
    quiz = build(:quiz, user: @user, category: @category)
    assert quiz.valid?
  end

  def test_invalid_without_title
    quiz = build(:quiz, user: @user, category: @category, title: nil)
    assert_not quiz.valid?
    assert_includes quiz.errors[:title], "can't be blank"
  end

  def test_slug_is_set_on_create
    @quiz.save!
    assert_not_nil @quiz.slug
    assert @quiz.slug.include?(@quiz.title.parameterize)
  end

  def test_invalid_without_user
    quiz = build(:quiz, user: nil, category: @category)
    assert_not quiz.valid?
    assert_includes quiz.errors[:user], "must exist"
  end

  def test_invalid_without_category
    quiz = build(:quiz, user: @user, category: nil)
    assert_not quiz.valid?
    assert_includes quiz.errors[:category], "must exist"
  end

  def test_generated_slug_is_unique
    quiz1 = create(:quiz, title: "Not Unique Title")
    quiz2 = create(:quiz, title: "Not Unique Title")
    assert_not_equal quiz1.slug, quiz2.slug
  end

  def test_title_can_be_duplicate_but_slug_must_be_unique
    quiz1 = create(:quiz, user: @user, category: @category, title: "Same Title")
    quiz2 = create(:quiz, user: @user, category: @category, title: "Same Title")
    assert_not_equal quiz1.slug, quiz2.slug
  end

  # Callbacks
  def test_sets_slug_before_validation_on_create
    quiz = build(:quiz, title: "Unique Title", user: @user, category: @category)
    quiz.valid?
    assert_equal "unique-title", quiz.slug
  end

  def test_increments_slug_if_duplicate_exists
    create(:quiz, title: "Unique Title", user: @user, category: @category)
    quiz2 = build(:quiz, title: "Unique Title", user: @user, category: @category)
    quiz2.valid?
    assert_match(/unique-title-\d+/, quiz2.slug)
  end

  def test_slug_is_immutable_after_creation
    quiz = create(:quiz, user: @user, category: @category)
    original_slug = quiz.slug
    quiz.slug = "new-slug"
    assert_not quiz.valid?
    assert_includes quiz.errors[:slug], I18n.t("quiz.slug.immutable")
    quiz.reload
    assert_equal original_slug, quiz.slug
  end

  # Custom methods
  def test_publish_calls_publish_service
    quiz = create(:quiz, user: @user, category: @category)
    service = Minitest::Mock.new
    service.expect(:publish!, nil)
    Quizzes::PublishService.stub(:new, service) do
      quiz.publish!
    end
    service.verify
  end
end
