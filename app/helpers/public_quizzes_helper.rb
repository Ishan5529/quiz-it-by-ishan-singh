# frozen_string_literal: true

module PublicQuizzesHelper
  def encrypt_correct_option(option)
    key = Rails.application.secret_key_base[0..31]
    crypt = ActiveSupport::MessageEncryptor.new(key)
    crypt.encrypt_and_sign(option.to_s)
  end
end
