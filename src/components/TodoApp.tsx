import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue.trim(),
          completed: false,
        },
      ]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">할 일 목록</h1>
          <p className="text-muted-foreground">
            완료: {completedCount} / {totalCount}
          </p>
        </div>

        <div className="mb-6">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="새로운 할 일을 입력하세요..."
              className="flex-1 border-2 border-border focus:ring-2 focus:ring-ring"
            />
            <Button
              onClick={addTodo}
              size="icon"
              className="border-2 border-border hover:bg-secondary"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {todos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              할 일이 없습니다. 새로운 할 일을 추가해보세요!
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-3 border-2 border-border rounded-md ${
                  todo.completed ? "bg-muted" : "bg-card"
                }`}
              >
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="border-2 border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? "line-through text-muted-foreground"
                      : "text-card-foreground"
                  }`}
                >
                  {todo.text}
                </span>
                <Button
                  onClick={() => deleteTodo(todo.id)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 border border-border hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="mt-6 text-center">
            <Button
              onClick={() => setTodos(todos.filter((todo) => !todo.completed))}
              variant="outline"
              className="border-2 border-border hover:bg-secondary"
              disabled={completedCount === 0}
            >
              완료된 항목 삭제 ({completedCount})
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};