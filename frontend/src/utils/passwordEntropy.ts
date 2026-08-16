// Documentação que utilizei: https://zxcvbn-ts.github.io/zxcvbn/

import { useDeferredValue, useEffect, useState } from 'react';
import { ZxcvbnFactory, type ZxcvbnResult } from '@zxcvbn-ts/core'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'

const options = {
  // recommended
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
    // recommended the language of the country that the user will be in
  },
  // recommended
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  // recommended
  useLevenshteinDistance: true,
  // optional
  translations: zxcvbnEnPackage.translations,
}
const zxcvbn = new ZxcvbnFactory(options)


export const usePasswordStrength = (password: string) => {
  const [result, setResult] = useState<ZxcvbnResult | null>(null)
  // NOTE: useDeferredValue is React v18 only, for v17 or lower use debouncing
  const deferredPassword = useDeferredValue(password)

  useEffect(() => {
    zxcvbn.checkAsync(deferredPassword).then((response) => setResult(response))
  }, [deferredPassword])

  return result
}
