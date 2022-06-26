namespace Crud_Operations.Common_Layer.Models
{
    public class UpdateRecordResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = "";
    }

    public class UpdateRecordRequest
    {
        public int Id { get; set; }

        public string UserName { get; set; } = "";

        public int Age { get; set; }
    }
}
