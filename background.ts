import { Storage } from "@plasmohq/storage"

const storage = new Storage()

async function syncDNRRules(blockedUrls: string[]) {
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules()
  const existingRuleIds = existingRules.map((r) => r.id)

  const newRules: chrome.declarativeNetRequest.Rule[] = blockedUrls.map(
    (url, index) => ({
      id: index + 1,
      priority: 1,
      action: {
        type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
        redirect: {
          extensionPath: `/blocked.html?url=${encodeURIComponent(url)}`
        }
      },
      condition: {
        urlFilter: `||${url}^`,
        resourceTypes: [
          chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
          chrome.declarativeNetRequest.ResourceType.SUB_FRAME
        ]
      }
    })
  )

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: existingRuleIds,
    addRules: newRules
  })
}

async function initBlocking() {
  const blockedUrls: string[] = (await storage.get("blockedUrls")) || []
  await syncDNRRules(blockedUrls)
}

initBlocking()

chrome.runtime.onInstalled.addListener(() => {
  initBlocking()
})

chrome.runtime.onStartup.addListener(() => {
  initBlocking()
})

storage.watch({
  blockedUrls: (c) => {
    const newUrls: string[] = c.newValue || []
    syncDNRRules(newUrls)
  }
})
