# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_12_163327) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "academies", force: :cascade do |t|
    t.string "name", null: false
    t.string "address", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "zipcode", null: false
    t.string "website"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "academy_photo"
    t.index ["user_id"], name: "index_academies_on_user_id"
  end

  create_table "brackets", force: :cascade do |t|
    t.boolean "finished", default: false
    t.bigint "tournament_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tournament_id"], name: "index_brackets_on_tournament_id"
  end

  create_table "rounds", force: :cascade do |t|
    t.string "entrant1", null: false
    t.string "entrant2", null: false
    t.string "winner"
    t.bigint "bracket_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bracket_id"], name: "index_rounds_on_bracket_id"
  end

  create_table "tournaments", force: :cascade do |t|
    t.string "belt", null: false
    t.string "start_date", null: false
    t.boolean "finished", default: false
    t.string "winner"
    t.string "weight"
    t.bigint "academy_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "gender", null: false
    t.boolean "tournament_begun", default: false
    t.integer "bracket1_id"
    t.integer "bracket2_id"
    t.integer "bracket3_id"
    t.index ["academy_id"], name: "index_tournaments_on_academy_id"
  end

  create_table "tourney_rosters", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "tournament_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tournament_id"], name: "index_tourney_rosters_on_tournament_id"
    t.index ["user_id"], name: "index_tourney_rosters_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "instructor", default: false
    t.boolean "admin", default: false
    t.bigint "academy_id"
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "belt", null: false
    t.string "nickname"
    t.string "stripes"
    t.string "profile_photo"
    t.index ["academy_id"], name: "index_users_on_academy_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
