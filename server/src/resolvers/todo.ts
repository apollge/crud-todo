import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Todo } from "../entities/Todo";

@InputType()
class TodoInput {
  @Field()
  title: string;
}

@ObjectType()
class FieldError {
  @Field()
  message: string;
}

@ObjectType()
class TodoResponse {
  @Field(() => FieldError, { nullable: true })
  errors?: FieldError;

  @Field(() => Todo, { nullable: true })
  todo?: Todo;
}

@Resolver()
export class TodoResolver {
  @Query(() => TodoResponse)
  async getTodo(@Arg("id", () => Int) id: number): Promise<TodoResponse> {
    const todo = await Todo.findOne(id);

    if (!todo) {
      return {
        errors: {
          message: "Could not find todo.",
        },
      };
    }

    return { todo };
  }

  @Query(() => [Todo])
  async getTodos(): Promise<Todo[]> {
    return Todo.find({
      order: {
        createdAt: "DESC",
      },
    });
  }

  @Mutation(() => Todo)
  async createTodo(@Arg("input") input: TodoInput): Promise<Todo> {
    return Todo.create({
      ...input,
    }).save();
  }

  @Mutation(() => Todo, { nullable: true })
  async updateTodo(
    @Arg("id", () => Int) id: number,
    @Arg("title") title: string
  ): Promise<Todo | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Todo)
      .set({ title })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Todo.delete({ id });
    return true;
  }
}
