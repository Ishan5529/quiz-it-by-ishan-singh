# frozen_string_literal: true

module DestructureOptions
  extend ActiveSupport::Concern

  private

    def destructure_options(options)
      options.each_with_index.with_object({}) do |(option, index), result|
        result["option#{index + 1}"] = option if option.present?
      end
    end

    def fill_missing_options_with_nil(options_hash)
      (1..6).each do |i|
        key = "option#{i}"
        options_hash[key] = nil unless options_hash.key?(key)
      end
      options_hash
    end

    def destructure_options_if_present(params)
      options_hash = {}
      if params[:question]&.key?(:options)
        options_hash = destructure_options(params[:question][:options])
      end
      options_hash = fill_missing_options_with_nil(options_hash)
    end
end
