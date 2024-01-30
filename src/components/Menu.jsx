import { ChakraProvider } from '@chakra-ui/react'

import { Menu, MenuButton, MenuList, MenuItem, Link, IconButton } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons";


export default function Menu() {
    var label_text;
    var ref_link;
    let UserIn = localStorage.getItem("access_token")
    if (!UserIn) {
        ref_link = "/login"
        label_text = "Войти"
    }else {
        ref_link = "/logout"
        label_text = "Выйти"
    }
    
    return (
        <ChakraProvider>
            <Menu>
                <MenuButton mt={"1rem"} ml={"1rem"} as={ IconButton } icon={<HamburgerIcon />} variant={"outline"}></MenuButton>
                <MenuList>
                    <Link href={"/"} _hover={{ textDecoration: "none" }}>
                        <MenuItem>Все заметки</MenuItem>
                    </Link>
                    <Link href={"/note"} _hover={{ textDecoration: "none" }}>
                        <MenuItem>Написать заметку</MenuItem>
                    </Link>
                    <Link hidden={!UserIn} href={"/account"} _hover ={{ textDecoration: "none" }}>
                        <MenuItem>Учётная запись</MenuItem>
                    </Link>
                    <Link href={ref_link} _hover={{ textDecoration: "none" }}>
                        <MenuItem>{label_text}</MenuItem>
                    </Link>
                </MenuList>
            </Menu>
        </ChakraProvider>
    )
}