import React from "react"
import NextLink from "next/link"
import { Button, Flex, Heading, Icon, Link, useColorModeValue } from "@chakra-ui/react"
import { BiWorld } from "react-icons/bi"

import { NAV_HEIGHT } from "lib/config"
import { useMe } from "lib/hooks/useMe"
import { useLogout } from "lib/hooks/useLogout"

export const Nav: React.FC = () => {
  const { me } = useMe()
  const logout = useLogout()

  return (
    <Flex
      // position="fixed"
      w="100%"
      h={NAV_HEIGHT}
      borderBottom="1px"
      borderColor={useColorModeValue("gray.400", "gray.600")}
      justify="space-between"
      align="center"
      px={4}
      bg={useColorModeValue("white", "gray.900")}
    >
      <NextLink passHref href="/">
        <Flex align="center" _hover={{ cursor: "pointer" }}>
          <Icon as={BiWorld} boxSize={8} />
          <Heading ml={2} fontSize="xl">
            Climate Map
          </Heading>
        </Flex>
      </NextLink>
      {me ? (
        <Button variant="ghost" onClick={() => logout()}>
          Logout
        </Button>
      ) : (
        <NextLink passHref href="/login">
          <Button as={Link} variant="ghost" href="/login" sx={{ textDecor: "none !important" }}>
            Login
          </Button>
        </NextLink>
      )}
    </Flex>
  )
}
