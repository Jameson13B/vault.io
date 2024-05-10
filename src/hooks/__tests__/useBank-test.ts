import { renderHook, act, waitFor } from '@testing-library/react'
import { useBank } from '../useBank'

describe('useBank', () => {
  it('should set rounds to game state', () => {
    const { result, rerender } = renderHook(() => useBank({ rounds: 10 }))
    expect(result.current.gameState.total_rounds).toBe(10)
  })

  it('should add players', () => {
    const { result, rerender } = renderHook(() => useBank({ rounds: 10 }))
    act(() => {
      result.current.addPlayer('Jameson')
      result.current.addPlayer('Chris')
      rerender()
    })

    expect(result.current.gameState.players).toEqual([
      { name: 'Jameson', score: 0, is_active: true },
      { name: 'Chris', score: 0, is_active: true },
    ])
  })

  it.skip('should roll dice and accurately count', () => {
    const { result, rerender } = renderHook(() => useBank({ rounds: 10 }))

    act(() => {
      result.current.rollDice(5)
    })

    expect(result.current.gameState.roll_count).toBe(1)
    expect(result.current.gameState.round_total).toBe(5)

    act(() => {
      result.current.rollDice(7)
    })

    expect(result.current.gameState.roll_count).toBe(2)
    expect(result.current.gameState.round_total).toBe(75)

    act(() => {
      result.current.rollDice(4, true)
    })

    expect(result.current.gameState.roll_count).toBe(3)
    expect(result.current.gameState.round_total).toBe(79)

    act(() => {
      result.current.rollDice(6, true)
    })

    expect(result.current.gameState.roll_count).toBe(4)
    expect(result.current.gameState.round_total).toBe(158)
  })

  it.only('should bank players', async () => {
    const { result, rerender } = renderHook(() => useBank({ rounds: 10 }))
    act(() => {
      result.current.addPlayer('Jameson')
      result.current.addPlayer('Chris')
      result.current.addPlayer('Nathan')
      result.current.rollDice(5)
      result.current.bank(['Jameson'])
    })

    rerender()

    await waitFor(() => {
      // console.log('HERE', result.current.gameState)

      expect(result.current.gameState.players).toEqual([
        { name: 'Chris', score: 0, is_active: true },
        { name: 'Jameson', score: 5, is_active: false },
      ])
    })

    // expect(result.current.gameState.players).toEqual([
    //   { name: 'Chris', score: 0, is_active: true },
    //   { name: 'Jameson', score: 5, is_active: false },
    // ])
  })
})
