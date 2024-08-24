import useUserStore from "../../store/userStore"



export const AppBar = () => {
        const { user }= useUserStore()
    return <div className="bg-black h-12 text-white">
        {user?.name}
    </div>
}