class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  before_filter :configure_permitted_parameters, if: :devise_controller?

 protected

 def configure_permitted_parameters
   devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :address, :city,
     :state, :zip, :phone, :type])
 end
end
