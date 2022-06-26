using Crud_Operations.Common_Layer.Models;
using System.Data.SqlClient;

namespace Crud_Operations.Repository_Layer
{
    public class CrudOperationRL : ICrudOperationRL
    {
        public readonly IConfiguration _configuration;
        public readonly SqlConnection _sqlConnection;

        public CrudOperationRL(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlConnection = new SqlConnection(_configuration["ConnectionStrings:DBSettingConnection"]);
        }

        public async Task<CreateRecordResponse> CreateRecord(CreateRecordRequest request)
        {
            CreateRecordResponse response = new CreateRecordResponse();
            response.IsSuccess = true;
            response.Message = "Successful";

            try 
            {
                string sqlQuery = "insert into CrudOperationTable (UserName, Age) values (@UserName, @Age)";
                using (SqlCommand sqlCommand = new SqlCommand(sqlQuery, _sqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@UserName", request.UserName);
                    sqlCommand.Parameters.AddWithValue("@Age", Convert.ToInt32(request.Age));
                    _sqlConnection.Open();
                    int status = await sqlCommand.ExecuteNonQueryAsync();
                    if(status<=0)
                    {
                        response.IsSuccess = false;
                        response.Message = "Something went wrong";
                    }
                }
            }catch(Exception ex)
            {
                    response.IsSuccess=false;
                response.Message = ex.Message;
            }
            finally
            {
                _sqlConnection.Close();
            }

            return response;
        }

        public async Task<DeleteRecordResponse> DeleteRecord(DeleteRecordRequest request)
        {
            DeleteRecordResponse response = new DeleteRecordResponse();
            response.IsSuccess = true;
            response.Message = "Successful";

            try 
            {

                string sqlQuery = "Delete from CrudOperationTable where Id=@Id";
                using (SqlCommand sqlCommand = new SqlCommand(sqlQuery, _sqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@Id", request.Id);
                    _sqlConnection.Open();
                    int status = await sqlCommand.ExecuteNonQueryAsync();
                    if (status <= 0)
                    {
                        response.IsSuccess = false;
                        response.Message = "Something went Wrong";
                    }

                    
                }
                
            }
            catch(Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            finally
            {
                _sqlConnection.Close();
            }

            return response;
        }

        public async Task<ReadRecordResponse> ReadRecord()
        {
            ReadRecordResponse response = new ReadRecordResponse();
            response.IsSuccess = true;
            response.Message = "Successful";

            try
            {
                string sqlQuery = "Select UserName, Age, Id from CrudOperationTable;";
                using(SqlCommand sqlCommand=new SqlCommand(sqlQuery, _sqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    _sqlConnection.Open();
                    using(SqlDataReader sqlDataReader=await sqlCommand.ExecuteReaderAsync())
                    {
                        if(sqlDataReader.HasRows)
                        {
                            response.readRecordData = new List<ReadRecoderData>();
                            while(await sqlDataReader.ReadAsync())
                            {
                                ReadRecoderData dbData = new ReadRecoderData();
                                dbData.Id = sqlDataReader["id"] != DBNull.Value ? Convert.ToInt32(sqlDataReader["id"]) : 0;
                                dbData.UserName = sqlDataReader["UserName"] != DBNull.Value ? sqlDataReader["UserName"].ToString() : string.Empty;
                                dbData.Age = sqlDataReader["Age"] !=DBNull.Value?Convert.ToInt32(sqlDataReader["Age"]):0;
                                response.readRecordData.Add(dbData);

                            }
                        }
                    }

                }


            }catch(Exception ex)
            {
                response.IsSuccess = false;
                response.Message=ex.Message;
            }
            finally
            {
                _sqlConnection.Close();
            }

            return response;
        }

        public async Task<UpdateRecordResponse> UpdateRecord(UpdateRecordRequest request)
        {
           UpdateRecordResponse response = new UpdateRecordResponse();
            response.IsSuccess = true;
            response.Message = "Successful";

            try
            {
                string sqlQuery = "Update CrudOperationTable set UserName=@UserName, Age= @Age where Id=@Id";
                using (SqlCommand sqlCommand = new SqlCommand(sqlQuery, _sqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@UserName", request.UserName);
                    sqlCommand.Parameters.AddWithValue("@Age", request.Age);
                    sqlCommand.Parameters.AddWithValue("@Id", request.Id);
                    _sqlConnection.Open();
                    int status=await sqlCommand.ExecuteNonQueryAsync();
                    if (status <= 0)
                    {
                        response.Message = "Something went wrong";
                        response.IsSuccess=false;
                    }
                    

                }


            }catch(Exception ex)
            {
                response.Message= ex.Message;
                response.IsSuccess = false;

            }finally
            {
                _sqlConnection.Close();
            }

            return response;
        }
    }
}
