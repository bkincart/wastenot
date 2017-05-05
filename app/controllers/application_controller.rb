class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  before_filter :configure_permitted_parameters, if: :devise_controller?

 protected

  def after_sign_in_path_for(resource)
    if current_user.store?
      user_inventories_path(current_user.id)
    elsif current_user.shelter?
      user_pickups_path(current_user.id)
    else
      root_path
    end
  end

  def after_sign_up_path_for(resource)
    if current_user.store?
      user_inventories_path(current_user.id)
    elsif current_user.shelter?
      user_pickups_path(current_user.id)
    else
      root_path
    end
  end

 def configure_permitted_parameters
   devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :address, :city,
     :state, :zip, :phone, :type])
 end
end
