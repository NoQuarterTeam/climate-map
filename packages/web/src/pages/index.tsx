import * as React from "react"
import { ZoomControl } from "react-mapbox-gl"
import { FitBounds } from "react-mapbox-gl/lib/map"
import {
  Box,
  Center,
  Button,
  Heading,
  HStack,
  IconButton,
  useColorMode,
  Spinner,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  VStack,
} from "@chakra-ui/react"
import Head from "next/head"
import { BiMoon, BiSun } from "react-icons/bi"
import { gql } from "@apollo/client"

import { useLogout } from "lib/hooks/useLogout"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { useDestroyAccountMutation } from "lib/graphql"
import { Mapbox } from "lib/mapbox"
import { MAPBOX_STYLE, MAPBOX_STYLE_DARK, NAV_HEIGHT, WORLD_BBOX } from "lib/config"

export const DESTROY_ACCOUNT = gql`
  mutation DestroyAccount {
    destroyAccount
  }
`

export default function Home() {
  const { me, loading } = useMe()
  const alertProps = useDisclosure()
  const logout = useLogout()
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  const { colorMode, toggleColorMode } = useColorMode()
  const handler = useMutationHandler()
  const [destroy, { loading: destroyLoading }] = useDestroyAccountMutation()
  const handleDestroy = () => {
    return handler(destroy, { onSuccess: () => logout() })
  }
  const isDark = colorMode === "dark"
  return (
    <Box>
      <Head>
        <title>Climate Map</title>
      </Head>

      {loading ? (
        <Center minH="100vh">
          <Spinner />
        </Center>
      ) : me ? (
        <Center minH="100vh">
          <VStack spacing={6}>
            <Heading as="h3" fontSize="2xl">
              Hello, {me.firstName}!
            </Heading>
            <HStack>
              <Button size="sm" variant="outline" isDisabled={destroyLoading} onClick={() => logout()}>
                Logout
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                isDisabled={destroyLoading}
                isLoading={destroyLoading}
                variant="outline"
                onClick={alertProps.onOpen}
              >
                Delete account
              </Button>
            </HStack>

            <AlertDialog
              {...alertProps}
              motionPreset="slideInBottom"
              isCentered
              leastDestructiveRef={cancelRef}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete account
                  </AlertDialogHeader>
                  <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={alertProps.onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={handleDestroy}
                      isLoading={destroyLoading}
                      isDisabled={destroyLoading}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </VStack>
        </Center>
      ) : (
        <Mapbox
          fitBounds={WORLD_BBOX as FitBounds}
          fitBoundsOptions={{ duration: 50, linear: true, padding: 20 }}
          style={isDark ? MAPBOX_STYLE_DARK : MAPBOX_STYLE}
          containerStyle={{
            top: `${NAV_HEIGHT}px`,
            height: `calc(100vh - ${NAV_HEIGHT}px)`,
            width: "100vw",
            cursor: "grab",
          }}
        >
          <ZoomControl position="bottom-right" />
        </Mapbox>
      )}

      <Box pos="absolute" top={16} right={4}>
        <IconButton
          borderRadius="full"
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          variant="ghost"
          onClick={toggleColorMode}
          icon={<Box as={isDark ? BiSun : BiMoon} boxSize="20px" />}
        />
      </Box>
    </Box>
  )
}
