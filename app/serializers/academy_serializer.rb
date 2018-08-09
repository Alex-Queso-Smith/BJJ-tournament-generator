class AcademySerializer < ActiveModel::Serializer
  attributes :id,
    :name,
    :address,
    :city,
    :state,
    :zipcode,
    :website,
    :user_id,
    :academy_photo
end
