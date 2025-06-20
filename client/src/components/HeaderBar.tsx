import { useNavigate } from "react-router-dom"
import logo from '../assets/text-logo.png'
const HeaderBar = () => {
    const nav = useNavigate()


    const styles = {
        container: 'bg-gradient-to-b from-sky-600 to-sky-500  text-white flex flex-col xl:flex-row items-center justify-center xl:justify-between pt-3 sm:pb-3 xl:px-10',
        nav: 'hidden sm:block flex flex-row items-center xl:gap-5',
        links: 'flex flex-row text-2xl',
        navLink: 'transition-all cursor-pointer border border-[#ffffff77] border-l border-r first:border-l-0 last:border-r-0 text-shadow-lg hover:text-blue-200 flex items-center py-1 px-4',
        dropdown: 'sm:hidden flex-grow w-full mt-3',
        dd_btn: 'bg-blue-500 hover:bg-blue-300 w-full h-10',
        dd_menu: 'transition-all w-full bg-white text-black',
        dd_list: 'flex hover:bg-gray-100 text-xl text-blue-500 items-center justify-center border-b border-blue-300 p-1'
    } as const;

    return (
        <div className={styles.container}>
            <div className="cursor-pointer" onClick={() => nav("/")}>
                <img src={logo} alt="" />
            </div>
        </div>
    )
}

export default HeaderBar