import type { Step } from '../types'

// Plain A2-level "what do I do here?" text for the ⓘ button next to each
// step's instruction. A step can set its own `help` to override this.
export function getStepHelp(step: Step): string[] {
  if (step.help) return step.help

  const itemAudio =
    (step.kind === 'noticeListen' && step.items.some(i => i.audioFile)) ||
    (step.kind === 'qa' && step.questions.some(q => q.audioFile))
  const listen = step.audioFile
    ? ['Press ▶ to play the audio. You can listen many times.']
    : itemAudio
      ? ['Press ▶ next to each sentence to hear it. You can listen many times.']
      : []

  switch (step.kind) {
    case 'info':
      return [
        'There are no questions here. Just read.',
        ...(step.audioFile || step.sections?.some(s => s.audioExamples?.length)
          ? ['Press ▶ to hear the examples.']
          : []),
        'When you finish, click Continue.',
      ]

    case 'mcq':
      return [
        ...listen,
        'Read each sentence.',
        'Click the correct answer. You can change it.',
        'Then click Check answers. Green is correct. Red is wrong.',
      ]

    case 'gapFill':
      return step.audioFile
        ? [
            'First, read the sentences. Try to guess the missing words.',
            ...listen,
            'Write one word in each box.',
            'Then click Check answers. You will see the correct words.',
          ]
        : [
            'Read the sentences.',
            'Write one word in each box.',
            'Then click Check answers. You will see the correct words.',
          ]

    case 'qa': {
      const graded = step.questions.some(q => q.modelAnswer !== undefined)
      const dictation = step.questions.some(q => q.strict)
      if (dictation) {
        return [
          'Press ▶ to play each sentence. You can listen many times.',
          'Write exactly what you hear. Write every word.',
          'Then click Submit & see answers. Compare your sentence with the correct one.',
        ]
      }
      if (!graded) {
        return [
          'There is no right or wrong answer here.',
          'Write your ideas in each box. Short sentences are OK.',
          'Then click Submit.',
        ]
      }
      return [
        ...listen,
        'Write a short answer to each question. A few words are OK.',
        'Then click Submit & see answers. Compare your answer with the model answer.',
      ]
    }

    case 'wordBank':
      return [
        ...listen,
        'Look at the words in the box.',
        'Tap a word. Then tap a gap to put the word there. On a computer, you can also drag the word.',
        'To remove a word, tap it in the gap.',
        'When all gaps are full, click Check answers.',
      ]

    case 'noticeListen':
      if (step.markUnit === 'word') {
        return [
          ...listen,
          'Number 1 is an example. Look at it first.',
          'Listen. Click the words you hear clearly (the stressed words). Click again to remove.',
          'Then click Check answers. Green is correct. Red is wrong.',
        ]
      }
      if (step.markUnit === 'gap') {
        return [
          ...listen,
          'Number 1 is an example. Look at it first.',
          'Listen. Where do two words join together? Click the space between them. Click again to remove.',
          'Then click Check answers. Green is correct. Red is wrong.',
        ]
      }
      return [
        ...listen,
        'Read the sentences and listen carefully.',
        'You do not need to write anything.',
        ...(step.revealContent ? ['Click Show answers to check. Then click Continue.'] : ['Then click Continue.']),
      ]

    case 'discriminationGrid':
      return [
        ...listen,
        'You will hear one word five times. Each time it is word A or word B.',
        'For each number (1 to 5), click the word you hear.',
        'Then click Check answers.',
      ]
  }
}
