"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Sun, Moon } from "lucide-react"

export function CalculatorComponent() {
  const [display, setDisplay] = useState("0")
  const [darkMode, setDarkMode] = useState(false)
  const [prevValue, setPrevValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleNumberClick = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num))
  }

  const handleOperationClick = (op: string) => {
    if (prevValue === null) {
      setPrevValue(parseFloat(display))
      setDisplay("0")
      setOperation(op)
    } else {
      handleEqualsClick()
      setOperation(op)
    }
  }

  const handleEqualsClick = () => {
    if (prevValue !== null && operation) {
      const current = parseFloat(display)
      let result: number
      switch (operation) {
        case "+":
          result = prevValue + current
          break
        case "-":
          result = prevValue - current
          break
        case "*":
          result = prevValue * current
          break
        case "/":
          result = prevValue / current
          break
        default:
          return
      }
      setDisplay(result.toString())
      setPrevValue(null)
      setOperation(null)
    }
  }

  const handleClear = () => {
    setDisplay("0")
    setPrevValue(null)
    setOperation(null)
  }

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
  ]

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Calculator</h2>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              aria-label="Toggle dark mode"
            />
            <Moon className="h-4 w-4" />
          </div>
        </div>
        <Input
          value={display}
          readOnly
          className="text-right text-2xl mb-4"
        />
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn) => (
            <Button
              key={btn}
              onClick={() => {
                if (btn === "=") handleEqualsClick()
                else if (["+", "-", "*", "/"].includes(btn)) handleOperationClick(btn)
                else handleNumberClick(btn)
              }}
              variant={["+", "-", "*", "/", "="].includes(btn) ? "secondary" : "outline"}
              className="text-lg h-12"
            >
              {btn}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleClear} variant="destructive" className="w-full">
          Clear
        </Button>
      </CardFooter>
    </Card>
  )
}