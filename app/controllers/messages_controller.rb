class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages
  end

  def create
    @message = Message.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group)
    else
      flash.now[:alert] = "メッセージを入力してください"
    end
  end

  private

  def message_params
    params.require(:message).permit(:body).merge({group_id: params[:group_id], user_id: current_user.id})
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
