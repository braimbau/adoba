require "test_helper"

class IndicatorsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get indicators_index_url
    assert_response :success
  end
end
