class Api::V1::AcademiesController < ApiController

  def index
    admin_status = false
    instructor_status = false
    current_user_academy_id = false

    admin_status = current_user.admin? if user_signed_in?
    instructor_status = current_user.instructor? if user_signed_in?
    current_user_academy_id = current_user.academy_id if user_signed_in?

    academies = Academy.all
    render json: {
      academies: academies,
      admin_status: admin_status,
      instructor_status: instructor_status,
      current_user_academy_id: current_user_academy_id
    }
  end

  def show
    current_user_id = current_user.id if user_signed_in?

    admin_status = false
    instructor_status = false

    admin_status = current_user.admin? if user_signed_in?
    instructor_status = current_user.instructor? if user_signed_in?


    academy = Academy.find(params[:id])

    render json: {
      academy: academy,
      admin_status: admin_status,
      user_id: current_user_id,
      students: academy.students,
      white_belts: academy.white_belts,
      blue_belts: academy.blue_belts,
      purple_belts: academy.purple_belts,
      brown_belts: academy.brown_belts,
      black_belts: academy.black_belts,
    }
  end

  def new
    new_academy = Academy.new
  end

  def create
    new_academy = Academy.new(academy_params)
    new_academy.user = current_user

    if new_academy.save
      render json: { academy: new_academy }
    else
      render json: { errors: new_academy.errors }
    end
  end

  def edit
  end

  def update
    edited_academy = Academy.find(params[:id])

    if edited_academy.update(academy_params)
      render json: { academy: edited_academy }
    else
      render json: { errors: edited_academy.errors }
    end
  end

  private

  def academy_params
    params
      .permit(
        :id,
        :name,
        :address,
        :city,
        :state,
        :zipcode,
        :website,
        :academy_photo
      )
  end
end
