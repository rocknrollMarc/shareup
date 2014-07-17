class SharesController < ApplicationController
  before_filter :authenticate_user!, only: [:new, :create]
  respond_to :json

  def index 
    render json: []
  end

  def create
    link = params[:url]

    share = Share.create(share_params)
    render  status: 200,
      json: {
        success: share.persisted?,
        share_id: share.id
    }
  end
end
