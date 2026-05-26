import {useContext} from "react";
import {SWContext} from "../utils/context.js";

const NavItem = ({itemTitle}) => {
    const {changePage} = useContext(SWContext);
    return (
        <div onClick={() => changePage(itemTitle)}
             className=" rounded-md px-3 cursor-pointer text-center
                 bg-danger hover:bg-red-500 hover:text-white border border-main">{itemTitle}</div>
    )
}

export default NavItem;