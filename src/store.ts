import { writable } from "svelte/store"
import { browser } from "$app/environment"

export const theme = writable(browser && localStorage.getItem("theme"))
theme.subscribe((val) => {
  if (browser) return (localStorage.theme = val)
})