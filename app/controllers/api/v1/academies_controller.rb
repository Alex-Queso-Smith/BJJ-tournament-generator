class Api::V1::AcademiesController < ApiController

  def index
    academies = Academy.all
    render json: {academies: academies, admin_status: current_user.admin?, instructor_status: current_user.instructor?}
  end

  def show
    current_user_id = current_user.id if current_user
    admin_status = false
    instructor_status = false

    if user_signed_in?
      admin_status = current_user.admin?
      instructor_status = current_user.instructor?
    end

    academy = Academy.find(params[:id])

    render json: {
      academy: academy,
      admin_status: admin_status,
      user_id: current_user_id,

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
        :website
      )
  end
end
