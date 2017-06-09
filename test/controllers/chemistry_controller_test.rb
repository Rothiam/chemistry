require 'test_helper'

class ChemistryControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get chemistry_index_url
    assert_response :success
  end

end
