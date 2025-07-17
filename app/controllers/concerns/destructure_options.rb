# frozen_string_literal: true

module DestructureOptions
  extend ActiveSupport::Concern

  private

    def destructure_options(options)
      options.each_with_index.with_object({}) do |(option, index), result|
        result["option#{index + 1}"] = option if option.present?
      end
    end
end
