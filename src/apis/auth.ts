type RefreshType = {
  assess_token: string
  refresh_token: string
}

export const refreshToken = (data: RefreshType): Promise<RefreshType> => {
  return new Promise((resolve, reject) => {
    resolve({
      assess_token: "kskksjjsksks",
      refresh_token: "kskjsssssaaaaaaaaaaaf",
    })
  })
}
