class UsersController < ApplicationController
    def index
        users = User.all
        render json: users, only: [:id,:username, :avatar]
    end

    def show
        user = find_user
        render json: user, only: [:id,:username, :avatar]
    end

    def create
        user = User.find_by(user_params)
        if user == nil
            user = User.new(user_params)
            user.save
        end
        render json: user, only: [:id,:username, :avatar]
    end

    private

    def find_user
        @user = User.find(params[:id])
    end

    def user_params
        params.require(:user).permit(:username,:avatar)
    end

end


