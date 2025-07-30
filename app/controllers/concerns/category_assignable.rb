# frozen_string_literal: true

module CategoryAssignable
  extend ActiveSupport::Concern

  private

    def assign_category_id_from_name(attrs)
      if attrs["category"].present?
        category = Category.find_by(name: attrs["category"])
        attrs["category_id"] = category&.id
        attrs.delete("category")
      end
      attrs
    end
end
