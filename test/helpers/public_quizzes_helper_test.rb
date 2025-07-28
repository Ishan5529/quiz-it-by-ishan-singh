# frozen_string_literal: true

require "test_helper"

class PublicQuizzesHelperTest < ActionView::TestCase
  include PublicQuizzesHelper

  def test_encrypt_correct_option
    inputs = [1, "2", 3.5, "answer"]

    inputs.each do |input|
      encrypted = encrypt_correct_option(input)
      assert_kind_of String, encrypted

      assert_not_equal input.to_s, encrypted

      key = Rails.application.secret_key_base[0..31]
      crypt = ActiveSupport::MessageEncryptor.new(key)
      decrypted = crypt.decrypt_and_verify(encrypted)

      assert_equal input.to_s, decrypted, "Decrypted value should match original input"
    end
  end

  def test_encrypt_correct_option_returns_different_values_for_different_inputs
    encrypted1 = encrypt_correct_option(1)
    encrypted2 = encrypt_correct_option(2)

    assert_not_equal encrypted1, encrypted2, "Different inputs should produce different encryptions"
  end

  def test_encrypt_correct_option_consistent_with_same_input
    encrypted1 = encrypt_correct_option("same_value")
    encrypted2 = encrypt_correct_option("same_value")

    assert_not_equal encrypted1, encrypted2, "Same input should produce different encryptions due to IV/salt"

    key = Rails.application.secret_key_base[0..31]
    crypt = ActiveSupport::MessageEncryptor.new(key)

    assert_equal crypt.decrypt_and_verify(encrypted1), crypt.decrypt_and_verify(encrypted2)
  end
end
