namespace Jppc.Core.Exceptions
{
    public static class Codes
    {
        #region Authentication

        public static string EmailInUse => "email_in_use";
        public static string InvalidCredentials => "invalid_credentials";
        public static string InvalidCurrentPassword => "invalid_current_password";
        public static string InvalidEmail => "invalid_email";
        public static string InvalidFirstName => "invalid_first_name";
        public static string InvalidLastName => "invalid_last_name";
        public static string InvalidPassword => "invalid_password";
        public static string InvalidRole => "invalid_role";
        public static string RefreshTokenNotFound => "refresh_token_not_found";
        public static string RefreshTokenAlreadyRevoked => "refresh_token_already_revoked";
        public static string UserNotFound => "user_not_found";

        #endregion

        #region Issue

        public static string IssueNotFound => "issue_not_found";
        public static string InvalidIssueName => "invalid_issue_name";
        public static string InvalidIssueDescription => "invalid_issue_description";
        public static string InvalidIssuePages => "invalid_issue_pages";
        public static string InvalidIssuePicture => "invalid_issue_picture";

        #endregion

        #region Article

        public static string ArticleNotFound => "article_not_found";
        public static string ArticleAlreadyExists => "article_already_exists";
        public static string InvalidArticleName => "invalid_article_name";
        public static string InvalidArticleDescription => "invalid_article_description";
        public static string InvalidArticleFileName => "invalid_article_file_name";
        public static string InvalidArticleFileContent => "invalid_article_file_content";
        public static string InvalidArticleLanguage => "invalid_article_language";

        #endregion

        #region Payment

        public static string InvalidAddressCountry => "article_address_country";
        public static string InvalidAddressCity => "article_address_city";
        public static string InvalidAddressState => "article_address_state";
        public static string InvalidAddressPostalCode => "article_address_postal_code";
        public static string InvalidAddressPhone => "article_address_phone";
        public static string InvalidAddressRecipientName => "article_address_recipient_name";

        #endregion

        public static string ShippingAddressNotFound => "shipping_address_not_found";
        public static string InvalidQueryText => "invalid_query_text";
    }
}
