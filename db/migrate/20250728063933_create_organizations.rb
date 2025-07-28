# frozen_string_literal: true

class CreateOrganizations < ActiveRecord::Migration[7.1]
  def change
    create_table :organizations, id: :uuid do |t|
      t.string :name

      t.timestamps
    end

    add_index :organizations, :name, unique: true
  end
end
