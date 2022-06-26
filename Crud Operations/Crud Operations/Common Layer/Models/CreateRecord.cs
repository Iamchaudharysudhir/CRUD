namespace Crud_Operations.Common_Layer.Models
{
    public class CreateRecordRequest
    {
        public string UserName { get; set; } = "";
        public int Age { get; set; }
    }

    public class CreateRecordResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = "";
    }
}