import { describe, it, expect } from 'vitest'

function isValidStudentId(id) {
  return /^\d{8}$/.test(id)
}

function isValidFullName(name) {
  return /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(name)
}

describe('Student ID Validation', () => {
  it('should accept a valid 8-digit Student ID', () => {
    expect(isValidStudentId('64172020')).toBe(true)
  })

  it('should reject a Student ID containing letters', () => {
    expect(isValidStudentId('Yuan')).toBe(false)
  })
})

describe('Full Name Validation', () => {
  it('should accept a valid full name', () => {
    expect(isValidFullName('Yuan Kristoffer Valencia')).toBe(true)
  })

  it('should reject numbers as a full name', () => {
    expect(isValidFullName('12345')).toBe(false)
  })

  // ADD THE 5TH TEST HERE
  it('should reject empty required fields', () => {
    expect(isValidStudentId('')).toBe(false)
    expect(isValidFullName('')).toBe(false)
  })
})