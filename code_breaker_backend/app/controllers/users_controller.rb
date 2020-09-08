class UsersController < ApplicationController

    def show
        user = find_user
        render json: user, only: [:id,:username, :avatar]
    end

    def create
        @user.avatar.attach(io: File.open('app/assets/images/placeholder.png'),
        filename: 'placeholder.png', content_type: 'image/png')
    end

    private

    def find_user
        @user = User.find(params[:id])
    end

    def user_params
        params.require(:user).permit(:username,:avatar)
    end

end


