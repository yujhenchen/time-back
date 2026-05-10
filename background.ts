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
          extensionPath: `/blocked.html?url=${encodeURIComponent(url)}`,
        },
      },
      condition: {
        urlFilter: `||${url}^`,
        resourceTypes: [
          chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
          chrome.declarativeNetRequest.ResourceType.SUB_FRAME,
        ],
      },
    }),
  )

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: existingRuleIds,
    addRules: newRules,
  })
}

async function initBlocking() {
  const result = await chrome.storage.sync.get(["blockedUrls"])
  const blockedUrls: string[] = result.blockedUrls || []
  await syncDNRRules(blockedUrls)
}

initBlocking()

chrome.runtime.onInstalled.addListener(() => {
  initBlocking()
})

chrome.runtime.onStartup.addListener(() => {
  initBlocking()
})

chrome.storage.onChanged.addListener((changes) => {
  if (changes.blockedUrls) {
    const newUrls: string[] = changes.blockedUrls.newValue || []
    syncDNRRules(newUrls)
  }
})
