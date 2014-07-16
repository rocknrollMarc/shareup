class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  after_filter :set_csf_cookie_for_ng

  private

  def set_csf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_autenticity_token if protect_against_forgery?
  end

  def verified_request?
    super || form_autenticity_token == request.headers['HTTP_X_XSRF_TOKEN']
  end
end
