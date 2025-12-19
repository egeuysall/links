"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import { AnimatePresence, motion, cubicBezier } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FC, useEffect, useState } from "react"
import { IoIosClose } from "react-icons/io"

interface MenuItemLink {
  href: string
  text: string
}

interface MenuItem {
  id: string
  title: string
  links: MenuItemLink[]
}

const Header: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const date = new Date()
  const year = date.getFullYear()

  // Control body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = (): void => {
    setMobileMenuOpen(false)
  }

  // Animation variants
  const menuVariants = {
    initial: {
      opacity: 0,
      clipPath: "circle(0% at top right)"
    },
    animate: {
      opacity: 1,
      clipPath: "circle(150% at top right)",
      transition: {
        duration: 0.7,
        ease: cubicBezier(0.22, 1, 0.36, 1),
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      clipPath: "circle(0% at top right)",
      transition: {
        duration: 0.5,
        ease: cubicBezier(0.22, 1, 0.36, 1),
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  }

  const headerVariants = {
    initial: { y: -20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.22, 1, 0.36, 1)
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1)
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: cubicBezier(0.22, 1, 0.36, 1)
      }
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1)
      }
    }
  }

  const footerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 0.7,
      y: 0,
      transition: { delay: 0.8, duration: 0.4 }
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.2 }
    }
  }

  const accordionItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: i * 0.1
      }
    }),
    exit: (i: number) => ({
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.3,
        delay: i * 0.05
      }
    })
  }

  // const menuIconVariants = {
  //   closed: { rotate: 0, scale: 1 },
  //   open: { rotate: 180, scale: 1 },
  //   transition: { duration: 0.5 }
  // };

  const menuItems: MenuItem[] = [
    {
      id: "documentation",
      title: "Documentation",
      links: [
        { href: "/docs/getting-started", text: "Getting started" },
        { href: "/docs/changelog", text: "Changelog" }
      ]
    },
    {
      id: "discover",
      title: "Discover",
      links: [
        { href: "/discover/featured-links", text: "Featured links" },
        { href: "/discover/tips", text: "Tips" }
      ]
    },
    {
      id: "contact",
      title: "Contact",
      links: [
        { href: "mailto:hello@egeuysal.com", text: "Support" },
        { href: "/#contact", text: "Feedback" }
      ]
    },
    {
      id: "create",
      title: "Create",
      links: [
        { href: "/create/new-links", text: "New links" },
        { href: "/create/new-links#customize", text: "Customize" }
      ]
    },
    {
      id: "links",
      title: "Links",
      links: [
        { href: "/links/our-links", text: "Our links" },
        { href: "/#newsletter", text: "Newsletter" }
      ]
    }
  ]

  return (
    <div className="fixed top-6 right-0 left-0 z-10 flex w-full justify-center">
      <motion.header
        className="flex w-[82.5vw] justify-between rounded-lg border-2 border-[#9C6644] bg-[#7F5539]/75 py-3.5 shadow-sm backdrop-blur-md md:w-[87.5vw] lg:w-[92.5vw]"
        initial="initial"
        animate="animate"
        variants={headerVariants}
      >
        <Link href="/" className="flex items-center">
          <Image width={15} height={15} className="ml-4 transition duration-200 hover:opacity-75" alt="Link logo for header" src="/logos/header-logo.svg" />
        </Link>
        <NavigationMenu className="items-center justify-center md:mr-3.5">
          <NavigationMenuList className="flex font-bold text-[#EDE0D4]">
            <NavigationMenuItem className="hidden md:flex">
              <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/docs/getting-started">Getting started</NavigationMenuLink>
                <NavigationMenuLink href="/docs/changelog">Changelog</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:flex">
              <NavigationMenuTrigger>Links</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/links/our-links">Our links</NavigationMenuLink>
                <NavigationMenuLink href="/#newsletter">Newsletter</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:flex">
              <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/discover/featured-links">Featured links</NavigationMenuLink>
                <NavigationMenuLink href="/discover/tips">Tips</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:flex">
              <NavigationMenuTrigger>Create</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/create/new-links">New links</NavigationMenuLink>
                <NavigationMenuLink href="/create/new-links#customize">Customize</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:flex">
              <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="mailto:hello@egeuysal.com">Support</NavigationMenuLink>
                <NavigationMenuLink href="/#contact">Feedback</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          <button onClick={toggleMobileMenu} className="mr-4 flex md:hidden">
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoIosClose size={28} className="text-[#EDE0D4]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image width={25} height={25} alt="Hamburger menu" src="/icons/hamburger-menu.svg" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </NavigationMenu>
      </motion.header>

      {/* Full Screen Mobile Menu with Accordion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#EDE0D4] bg-[url('/images/texture.svg')] bg-cover bg-center md:hidden"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={menuVariants}
          >
            <motion.div className="flex justify-end p-6" variants={itemVariants}>
              <motion.button
                onClick={toggleMobileMenu}
                className="text-4xl text-[#593116]"
                aria-label="Close menu"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <IoIosClose />
              </motion.button>
            </motion.div>

            <motion.div className="flex flex-1 flex-col items-center justify-center px-8" variants={itemVariants}>
              <Accordion type="single" collapsible className="w-full max-w-md">
                {menuItems.map((item, i) => (
                  <motion.div key={item.id} custom={i} variants={accordionItemVariants} initial="initial" animate="animate" exit="exit">
                    <AccordionItem value={item.id} className="border-b-0">
                      <AccordionTrigger className="flex items-center justify-center text-3xl font-bold text-[#593116]">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10
                          }}
                          className="text-center"
                        >
                          {item.title}
                        </motion.span>
                      </AccordionTrigger>
                      <AccordionContent className="text-center">
                        {item.links.map((link, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: j * 0.05, duration: 0.3 }}
                            className="flex justify-center"
                          >
                            <Link
                              href={link.href}
                              className="inline-block py-3 text-xl text-[#593116] transition-colors hover:text-[#9C6644]"
                              onClick={closeMobileMenu}
                            >
                              {link.text}
                            </Link>
                          </motion.div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>

            <motion.div
              className="w-full pb-10 text-center text-[#593116] opacity-70"
              variants={footerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <p className="font-bold">&copy; {year} Links</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Header
