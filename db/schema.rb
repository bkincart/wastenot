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

ActiveRecord::Schema.define(version: 20170504032033) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text     "body",         null: false
    t.integer  "user_id"
    t.integer  "inventory_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "user_name",    null: false
    t.index ["inventory_id"], name: "index_comments_on_inventory_id", using: :btree
    t.index ["user_id"], name: "index_comments_on_user_id", using: :btree
  end

  create_table "inventories", force: :cascade do |t|
    t.integer  "quantity",                   null: false
    t.string   "measurement"
    t.string   "item",                       null: false
    t.boolean  "available",   default: true, null: false
    t.integer  "user_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.boolean  "active",      default: true
    t.index ["user_id"], name: "index_inventories_on_user_id", using: :btree
  end

  create_table "pickups", force: :cascade do |t|
    t.integer  "shelter_id"
    t.integer  "store_id"
    t.integer  "inventory_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["inventory_id"], name: "index_pickups_on_inventory_id", using: :btree
    t.index ["shelter_id"], name: "index_pickups_on_shelter_id", using: :btree
    t.index ["store_id"], name: "index_pickups_on_store_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "name",                                null: false
    t.string   "address",                             null: false
    t.string   "city",                                null: false
    t.string   "state",                               null: false
    t.string   "zip",                                 null: false
    t.string   "phone"
    t.string   "type",                                null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
