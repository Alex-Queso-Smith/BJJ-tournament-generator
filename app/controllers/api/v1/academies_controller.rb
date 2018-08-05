class Api::V1::AcademiesController < ApiController
  def index
    academies = Academy.all
    render json: {academies: academies, admin_status: admin_status?, instructor_status: instructor_status?}
  end

  def new
    new_academy = Academy.new
  end

  def create

  end

  private

  def instructor_status?
    current_user.instructor?
  end

  def admin_status?
    current_user.admin?
  end
end
