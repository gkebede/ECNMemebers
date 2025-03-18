namespace Application.Core
{
      public class Result<T>   
    {
        public bool IsSuccess { get; set; }
        public string? Error { get; set; }
        public T? Value { get; set; }

        public static Result<T> Success(T value) => new Result<T>()
        {
            IsSuccess = true,
            Value = value
        };  // ; { IsSuccess = true, Value = value };

       // fuction a() => Console.WriteLine("Hello World");
        public static Result<T> Failure(string error) => new Result<T>
        { IsSuccess = false, Error = error };

    }
}